# Generated by Django 3.0.3 on 2024-07-19 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('database', '0003_otp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Species',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('details', models.TextField(max_length=2500)),
                ('status', models.CharField(max_length=50)),
            ],
        ),
    ]
