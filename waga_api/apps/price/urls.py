from rest_framework.routers import DefaultRouter
from apps.price.views import (
    ProductCategoryAttributeViewSet,
    ProductViewSet,
    ProductPriceSetViewSet,
    ProductCategoryViewSet
)

router = DefaultRouter()


router.register('products', ProductViewSet, 'products')
router.register('form-metadata', ProductCategoryAttributeViewSet, 'form-metadata')
router.register('set-price', ProductPriceSetViewSet, 'set-price')
router.register('categories', ProductCategoryViewSet, 'categories')

urlpatterns = router.urls
