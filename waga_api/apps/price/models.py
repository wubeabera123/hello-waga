from django.db import models
from django.utils.translation import gettext_lazy as _
from treenode.models import TreeNodeModel
from apps.core.models import AbstractBaseModel, DataLookup


class ProductCategory(AbstractBaseModel, TreeNodeModel):
    # the field used to display the model instance
    # default value 'pk'
    treenode_display_field = "name"

    name = models.CharField(verbose_name=_("Name"), max_length=50)
    value = models.CharField(verbose_name=_("Value"), max_length=100)

    class Meta(TreeNodeModel.Meta):
        verbose_name = "Product Category"
        verbose_name_plural = "Product Categories"
        db_table = "product_category"

    def __str__(self) -> str:
        return self.name


class ProductCategoryAttribute(AbstractBaseModel):
    """A model for defining attributes for some sub-category level
    since most of the products share the same attribute
    as a some category(not usually per each product item).
    This will be used in the front-end form.
    """

    product_category = models.ForeignKey(
        ProductCategory,
        on_delete=models.CASCADE,
        related_name="+",
        verbose_name=_("Product Category"),
    )

    field_name = models.CharField(
        max_length=100,
        verbose_name=_("Field Name")
    )

    field_type = models.ForeignKey(
        DataLookup,
        on_delete=models.SET_NULL,
        null=True,
        related_name="+",
        verbose_name=_("Field Type"),
        limit_choices_to={"type": "attribute_field_type"},
    )
    # TODO: Think about this. whether DataLookup is good or not
    form_type = models.ForeignKey(
        DataLookup,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+",
        verbose_name=_("Form Type"),
        limit_choices_to={"type": "attribute_form_type"},
    )

    required = models.BooleanField(verbose_name=_("Required"), default=True)

    class Meta:
        verbose_name: str = "Product Category Attribute"
        verbose_name_plural: str = "Product Category Attributes"
        db_table: str = "product_category_attribute"

    def __str__(self) -> str:
        return self.field_name


class Product(AbstractBaseModel):
    name = models.CharField(
        max_length=100,
        verbose_name=_("Name")
    )

    description = models.TextField(
        verbose_name=_("Description")
    )

    category = models.ForeignKey(
        ProductCategory,
        on_delete=models.PROTECT,
        related_name="product_categories",
        verbose_name=_("Category"),
        limit_choices_to={"tn_children_pks": ""}
    )
    # TODO: Better to move these two fields to the category attribute
    # TODO: Since it's varying based on merchants.
    # price = models.DecimalField(
    #     max_digits=12,
    #     decimal_places=2,
    #     verbose_name=_("Price")
    # )
    # # ? Think if this might be better if we do as a choice field
    # # ? like...list_type = models.CharField() with choices
    # # ? ["sell", 'rent", "both"]
    # is_for_sale = models.BooleanField(default=True)

    class Meta:
        verbose_name: str = "Product"
        verbose_name_plural: str = "Products"
        db_table: str = "product"

    # def update_price(self, price, is_for_sale):
    #     self.price = price
    #     self.is_for_sale = is_for_sale
    #     self.save()

    def __str__(self) -> str:
        return self.name


class ProductAttribute(AbstractBaseModel):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="product_attributes"
    )

    field_name = models.CharField(
        max_length=100,
        verbose_name=_("Name")
    )

    field_value = models.CharField(
        max_length=200,
        verbose_name=_("Value"),
    )

    class Meta:
        verbose_name: str = "Product Attribute"
        verbose_name_plural: str = "Product Attributes"
        db_table: str = "product_attribute"

    def __str__(self) -> str:
        return self.field_name
