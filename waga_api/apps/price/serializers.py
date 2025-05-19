from rest_framework import serializers
from apps.core.serializers import DataTypeFormTypeResponseSerializer
from apps.price.models import (
    Product,
    ProductAttribute,
    ProductCategory,
    ProductCategoryAttribute,
)
from apps.price.services import PriceSetService


class ProductCategorySerializer(serializers.ModelSerializer):
    tn_parent = serializers.StringRelatedField()

    class Meta:
        model = ProductCategory
        fields = ["id", "name", "tn_parent"]


class ProductCategoryAttributeResponseSerializer(serializers.ModelSerializer):
    product_category = ProductCategorySerializer()
    field_type = DataTypeFormTypeResponseSerializer()
    form_type = DataTypeFormTypeResponseSerializer()

    class Meta:
        model = ProductCategoryAttribute
        fields = [
            "id",
            "product_category",
            "field_name",
            "field_type",
            "form_type",
            "required",
        ]


class ProductPriceSetSerializer(serializers.Serializer):
    product_category = serializers.PrimaryKeyRelatedField(
        queryset=ProductCategory.objects.all()
    )

    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    attributes = serializers.DictField(child=serializers.JSONField())

    def validate(self, attrs):
        # product = attrs["product"]
        product_category = attrs["product_category"]
        attributes = attrs["attributes"]

        # Validate that attributes exist for this product category
        # category.category_attributes.values_list("field_name", flat=True)
        existing_attributes = list(
            ProductCategoryAttribute.objects.filter(
                product_category=product_category
            ).values_list("field_name", flat=True)
        )
        print("$$$ existing", existing_attributes)
        print("$$$$", attributes.keys())
        if len(attributes) != len(existing_attributes):
            raise serializers.ValidationError(
                f"Invalid Payload. this fields {existing_attributes} are required."
            )

        for attr in attributes.keys():
            if attr not in existing_attributes:
                raise serializers.ValidationError(f"Invalid attribute: {attr}")

        return attrs

    def create(self, validated_data):
        try:
            return PriceSetService.set_price(validated_data)
        except Exception as e:
            raise e

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        attributes = representation.pop("attributes")

        return {**representation, **attributes}


class ProductAttributeResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = [
            "id",
            "field_name",
            "field_value",
        ]


class ProductResponseSerializer(serializers.ModelSerializer):
    # category = ProductCategorySerializer()

    price_range = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "name", "description", "price_range"]

    def get_price_range(self, obj) -> str:
        attributes = list(ProductAttribute.objects.filter(
            product=obj,
            field_name="price"
        ).values_list("field_value", flat=True))

        if not attributes:
            return "ETB N/A"

        min_val = min(attributes)
        max_val = max(attributes)

        return f"ETB {min_val} - {max_val}"
