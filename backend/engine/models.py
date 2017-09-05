# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from uuid import uuid4
import hashlib
import warnings
from datetime import timedelta
from django.utils.translation import ugettext_lazy as _

from django.db import models
from django.core import validators
from django.utils import timezone

from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)

GENDER = {
    'Male': 'Male',
    'Female': 'Female'
}


class UserManager(BaseUserManager):

    def _create_user(self, email, password, is_staff, is_superuser, **kwargs):
        """Creates and saves a new User."""
        now = timezone.now()
        if not email:
            raise ValueError('Email must be set')
        email = self.normalize_email(email)
        if 'username' not in kwargs:
            username = hashlib.md5(email).hexdigest()[:30]
            kwargs['username'] = username
        user = self.model(email=email,
                          is_active=True,
                          is_staff=is_staff,
                          is_superuser=is_superuser,
                          date_joined=now,
                          **kwargs)
        user.set_password(password)
        if 'force_password_change' in kwargs:
            user.force_password_change = True
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **other_fields):
        return self._create_user(email, password, False, False, **other_fields)

    def create_superuser(self, email, password, **other_fields):
        return self._create_user(email, password, True, True, **other_fields)


def get_user_picture_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid4(), ext)
    return 'user_pictures/{0}'.format(filename)


class User(AbstractBaseUser, PermissionsMixin):

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    username = models.CharField(
        _('username'),
        max_length=75,
        unique=True,
        help_text=_(
            'Required. 30 characters or fewer. Letters, digits and '
            '@/./+/-/_ only.'
        ),
        validators=[
            validators.RegexValidator(
                r'^[\w.@+-]+$',
                _('Enter a valid username. '
                  'This value may contain only letters, numbers '
                  'and @/./+/-/_ characters.'), 'invalid'
            ),
        ],
        error_messages={
            'unique': _("A user with that username already exists."),
        })

    first_name = models.CharField(
        _('first name'),
        max_length=30,
        blank=True
    )

    last_name = models.CharField(
        _('last name'),
        max_length=30,
        blank=True
    )

    email = models.EmailField(
        _('email address'),
        unique=True,
        blank=False,
    )

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Designates whether the user can log into this admin site.'
        )
    )

    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as '
            'active. Unselect this instead of deleting accounts.'
        )
    )

    date_joined = models.DateTimeField(
        _('date joined'),
        default=timezone.now
    )

    force_password_change = models.BooleanField(
        _('force password change'),
        default=False,
        help_text=_(
            'Indicates whether this user must change password after '
            'next login'
        )
    )

    picture = models.ImageField(
        upload_to=get_user_picture_path,
        null=True, blank=True)

    objects = UserManager()

    class Meta:
        db_table = 'auth_user'
        verbose_name = _('user')
        verbose_name_plural = _('users')

    @property
    def fullname(self):
        """Returns user full name."""
        warnings.warn("Use get_full_name instead.", DeprecationWarning)
        return self.get_full_name()

    def get_full_name(self):
        """Gets user full name."""
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns user first name."
        return self.first_name

    def get_roles(self):
        """Returns a list of roles for this user."""
        try:
            agent_profile = self.profile
            roles = agent_profile.roles
        except Agent.DoesNotExist:
            roles = []
        roles = list(set(roles))
        return roles

    def set_password(self, raw_password):
        super(User, self).set_password(raw_password)
        self.force_password_change = False

    def delete(self):
        self.is_active = False
        self.save()


class Antrian(models.Model):
    name = models.CharField(max_length=64)
    location = models.TextField(null=True)
    owner = models.OneToOneField(User, related_name='antrian')
    users = models.ManyToManyField(User, through= 'AntrianUser', related_name='antrians')
    created = models.DateTimeField(auto_now_add=True)
    started = models.DateTimeField('Invalidated', blank=True, null=True)
    ended = models.DateTimeField('Invalidated', blank=True, null=True)

    def __str__(self):
        return self.name


class AntrianUser(models.Model):
    user = models.ForeignKey(User)
    antrian = models.ForeignKey(Antrian)
    nomor = models.PositiveIntegerField(null=True, blank=True)
    started = models.DateTimeField(auto_now_add=True)
    ended = models.DateTimeField('Invalidated', blank=True, null=True)

