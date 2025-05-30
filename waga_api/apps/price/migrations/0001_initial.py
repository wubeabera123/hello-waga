# Generated by Django 5.1.6 on 2025-03-05 14:20

import django.core.validators
import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted at')),
                ('name', models.CharField(max_length=100, verbose_name='Name')),
                ('description', models.TextField(verbose_name='Description')),
                ('price', models.DecimalField(decimal_places=2, max_digits=12, verbose_name='Price')),
                ('is_for_sale', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name': 'Product',
                'verbose_name_plural': 'Products',
                'db_table': 'product',
            },
        ),
        migrations.CreateModel(
            name='ProductAttribute',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted at')),
                ('field_name', models.CharField(max_length=100, verbose_name='Name')),
                ('field_value', models.CharField(max_length=200, verbose_name='Value')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_attributes', to='price.product')),
            ],
            options={
                'verbose_name': 'Product Attribute',
                'verbose_name_plural': 'Product Attributes',
                'db_table': 'product_attribute',
            },
        ),
        migrations.CreateModel(
            name='ProductCategory',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted at')),
                ('tn_ancestors_pks', models.TextField(blank=True, default='', editable=False, verbose_name='Ancestors pks')),
                ('tn_ancestors_count', models.PositiveIntegerField(default=0, editable=False, verbose_name='Ancestors count')),
                ('tn_children_pks', models.TextField(blank=True, default='', editable=False, verbose_name='Children pks')),
                ('tn_children_count', models.PositiveIntegerField(default=0, editable=False, verbose_name='Children count')),
                ('tn_depth', models.PositiveIntegerField(default=0, editable=False, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Depth')),
                ('tn_descendants_pks', models.TextField(blank=True, default='', editable=False, verbose_name='Descendants pks')),
                ('tn_descendants_count', models.PositiveIntegerField(default=0, editable=False, verbose_name='Descendants count')),
                ('tn_index', models.PositiveIntegerField(default=0, editable=False, verbose_name='Index')),
                ('tn_level', models.PositiveIntegerField(default=1, editable=False, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)], verbose_name='Level')),
                ('tn_priority', models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9999999999)], verbose_name='Priority')),
                ('tn_order', models.PositiveIntegerField(default=0, editable=False, verbose_name='Order')),
                ('tn_siblings_pks', models.TextField(blank=True, default='', editable=False, verbose_name='Siblings pks')),
                ('tn_siblings_count', models.PositiveIntegerField(default=0, editable=False, verbose_name='Siblings count')),
                ('name', models.CharField(max_length=50)),
                ('tn_parent', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tn_children', to='price.productcategory', verbose_name='Parent')),
            ],
            options={
                'verbose_name': 'Product Category',
                'verbose_name_plural': 'Product Categories',
                'db_table': 'product_category',
                'ordering': ['tn_order'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='product',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='product_categories', to='price.productcategory', verbose_name='Category'),
        ),
        migrations.CreateModel(
            name='ProductCategoryAttribute',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, verbose_name='id')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='created at')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='updated at')),
                ('deleted_at', models.DateTimeField(blank=True, null=True, verbose_name='deleted at')),
                ('field_name', models.CharField(max_length=100, verbose_name='Name')),
                ('required', models.BooleanField(default=True, verbose_name='Required')),
                ('field_type', models.ForeignKey(limit_choices_to={'type': 'attribute_field_type'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='core.datalookup', verbose_name='Field Type')),
                ('form_type', models.ForeignKey(blank=True, limit_choices_to={'type': 'attribute_form_type'}, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='core.datalookup', verbose_name='Form Type')),
                ('product_category', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='+', to='price.productcategory', verbose_name='Product Category Attributes')),
            ],
            options={
                'verbose_name': 'Product Category Attribute',
                'verbose_name_plural': 'Product Category Attributes',
                'db_table': 'product_category_attribute',
            },
        ),
    ]
