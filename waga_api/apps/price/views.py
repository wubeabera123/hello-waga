from apps.core.views import AbstractModelViewSet
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.mixins import (
    CreateModelMixin
)
from apps.price.models import (
    Product,
    ProductCategory,
    ProductCategoryAttribute
)
from apps.price.filters import ProductCategoryAttributeFilter, ProductFilter
from rest_framework.permissions import AllowAny
from apps.price.serializers import (
    ProductCategorySerializer,
    ProductResponseSerializer,
    ProductPriceSetSerializer,
    ProductCategoryAttributeResponseSerializer
)
from apps.price.permissions import (
    ProductCategoryAttributeAccessPolicy,
    CategoryAccessPolicy,
    ProductAccessPolicy,
    # ProductAttributeAccessPolicy
)


class ProductCategoryViewSet(AbstractModelViewSet):
    permission_classes = [CategoryAccessPolicy]
    http_method_names = ["get"]
    serializer_class = ProductCategorySerializer
    queryset = ProductCategory.objects.all()


class ProductCategoryAttributeViewSet(AbstractModelViewSet):
    permission_classes = [ProductCategoryAttributeAccessPolicy]
    http_method_names = ["get"]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductCategoryAttributeFilter
    serializer_class = ProductCategoryAttributeResponseSerializer
    queryset = ProductCategoryAttribute.objects.all()


class ProductViewSet(AbstractModelViewSet):
    permission_classes = [ProductAccessPolicy]
    serializer_class = ProductResponseSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    http_method_names = ["get", "patch", "delete"]
    queryset = Product.objects.all()


class ProductPriceSetViewSet(CreateModelMixin, GenericViewSet):
    permission_classes = [ProductAccessPolicy]
    serializer_class = ProductPriceSetSerializer
    queryset = None
