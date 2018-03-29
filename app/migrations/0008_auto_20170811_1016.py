# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-11 10:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20170810_2007'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='down_count',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='blog',
            name='up_count',
            field=models.BigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='fan',
            field=models.ManyToManyField(to='app.User'),
        ),
    ]
