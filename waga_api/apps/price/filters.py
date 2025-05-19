
from django_filters import FilterSet
from django_filters import rest_framework as filters

from apps.price.models import Product, ProductCategoryAttribute


class ProductCategoryAttributeFilter(FilterSet):
    category = filters.UUIDFilter(field_name='product_category')

    class Meta:
        model = ProductCategoryAttribute
        fields = ["category"]


class ProductFilter(FilterSet):
    category = filters.UUIDFilter(field_name='category')

    class Meta:
        model = Product
        fields = ["category"]
