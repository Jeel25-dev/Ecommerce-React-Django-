from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.models import Product,Review
from django.core.paginator import Paginator,EmptyPage,PageNotAnInteger

from base.serializers import ProductSerializer


from rest_framework import status







@api_view(['GET'])
def getProducts(request):

    query=request.query_params.get('keyword')
    # query1=request.query_params.get('keyword')
    print('qyery:',query)
    # print('qyery1:',query1)
    if query==None:
        query=''
        # query1=''


    products=Product.objects.filter(name__icontains=query)


    page=request.query_params.get('page')
    paginator=Paginator(products,4)

    try:
        products=paginator.page(page)
    except PageNotAnInteger:
        products=paginator.page(1)   
    except EmptyPage:
        products=paginator.page(paginator.num_pages)    


    if page==None:
        page=1

    page=int(page)        

    serializer=ProductSerializer(products,many=True)
    return Response({'products' :serializer.data,'page' :page,'pages' :paginator.num_pages}) 




@api_view(['GET'])
def getProduct(request,pk):
    product=Product.objects.get(_id=pk)
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data) 


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user=request.user
    product=Product.objects.create(
        user=user,
        name='sample name',
        price=0,
        brand='sample brand',
        countInStock=0,
        category='sample category',
        description=''
    )
    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data) 


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):
    data=request.data
    product=Product.objects.get(_id=pk)
    product.name=data['name']
    product.price=data['price']
    product.brand=data['brand']
    product.countInStock=data['countInStock']
    product.category=data['category']
    product.description=data['description']

    product.save()




    serializer=ProductSerializer(product,many=False)
    return Response(serializer.data) 


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product=Product.objects.get(_id=pk)
    product.delete()
    return Response("Product Deleted") 


@api_view(['POST'])
def uploadImage(request):
    data=request.data

    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)

    product.image=request.FILES.get('image')


    product.save()

    return Response('Image Uploaded')

@api_view(['POST'])
def uploadImage2(request):
    data=request.data

    product_id=data['product_id']
    product=Product.objects.get(_id=product_id)

    product.image2=request.FILES.get('image2')


    product.save()

    return Response('Image Uploaded')




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request,pk):
    user=request.user
    product=Product.objects.get(_id=pk)
    data=request.data

   
    alreadyExists=product.review_set.filter(user=user).exists()

    if alreadyExists:
        content={'detail':'Product already reviewed'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

   
    elif data['rating']==0:
        content={'detail':'Please Select a rating'}
        return Response(content,status=status.HTTP_400_BAD_REQUEST)

    
    else:
        review=Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )    
       
        review=product.review_set.all()
        product.numReviews=len(review)
        

        total = 0
        for i in review:
            total += i.rating
         

        product.rating=total/len(review)
        product.save()

        return Response('review added') 







     