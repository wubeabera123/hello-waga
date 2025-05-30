# Generated by Django 5.1.6 on 2025-03-05 15:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('price', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='value',
            field=models.CharField(default='', max_length=100, verbose_name='Value'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='productcategory',
            name='name',
            field=models.CharField(max_length=50, verbose_name='Name'),
        ),
        migrations.AlterField(
            model_name='productcategoryattribute',
            name='product_category',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='price.productcategory', verbose_name='Product Category'),
        ),
    ]
