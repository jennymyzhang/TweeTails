# Generated by Django 5.0.3 on 2024-04-24 23:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animal', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animal',
            name='lat',
            field=models.DecimalField(decimal_places=20, max_digits=100),
        ),
        migrations.AlterField(
            model_name='animal',
            name='lng',
            field=models.DecimalField(decimal_places=20, max_digits=100),
        ),
    ]
