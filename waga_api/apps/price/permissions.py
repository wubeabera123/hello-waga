from apps.core.permissions import AbstractAccessPolicy


class CategoryAccessPolicy(AbstractAccessPolicy):
    @classmethod
    def scope_queryset(cls, request, queryset):
        return queryset


class ProductCategoryAttributeAccessPolicy(AbstractAccessPolicy):
    @classmethod
    def scope_queryset(cls, request, queryset):
        return queryset


class ProductAccessPolicy(AbstractAccessPolicy):
    @classmethod
    def scope_queryset(cls, request, queryset):
        return queryset


class ProductAttributeAccessPolicy(AbstractAccessPolicy):
    @classmethod
    def scope_queryset(cls, request, queryset):
        return queryset
