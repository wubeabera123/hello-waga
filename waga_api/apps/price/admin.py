from django.contrib import admin
from treenode.admin import TreeNodeModelAdmin
from treenode.forms import TreeNodeForm
from apps.price.models import (
    Product,
    ProductAttribute,
    ProductCategory,
    ProductCategoryAttribute

)


@admin.register(ProductAttribute)
class ProductAttributeAdmin(admin.ModelAdmin):
    list_display = ["field_name", "field_value"]
    exclude = ["deleted_at"]


class ProductAttributeInline(admin.TabularInline):
    model = ProductAttribute
    readonly_fields = ["field_name", "field_value"]
    exclude = ["deleted_at"]

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductAttributeInline]
    # fields = ["name", "description", "category", "price", "is_for_sale"]
    exclude = ["deleted_at"]


@admin.register(ProductCategoryAttribute)
class ProductCategoryAttributeAdmin(admin.ModelAdmin):
    list_display = [
        "field_name", "field_type", "form_type"
    ]
    exclude = ["deleted_at"]


@admin.register(ProductCategory)
class CategoryAdmin(TreeNodeModelAdmin):
    exclude = ["deleted_at"]
    # set the changelist display mode: 'accordion', 'breadcrumbs' or 'indentation' (default)
    # when changelist results are filtered by a querystring,
    # 'breadcrumbs' mode will be used (to preserve data display integrity)
    treenode_display_mode = TreeNodeModelAdmin.TREENODE_DISPLAY_MODE_ACCORDION
    # treenode_display_mode = TreeNodeModelAdmin.TREENODE_DISPLAY_MODE_BREADCRUMBS
    # treenode_display_mode = TreeNodeModelAdmin.TREENODE_DISPLAY_MODE_INDENTATION

    # use TreeNodeForm to automatically exclude invalid parent choices
    form = TreeNodeForm
