from rest_framework import serializers
from ..models import Magasinier

class MagasinierSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='username'
     )
    image = serializers.ImageField(max_length = False,allow_empty_file=False,allow_null=False,use_url=True,required=False)

    #registered_courses = CoursSerializer("registered_courses",many=True,read_only=True)
    class Meta:
        model=Magasinier
        fields=["id","mail","first_name","last_name","date_of_birth","phone_number","image","user"]
        depth = 1
        #read_only_fields = ('registered_courses', )
        #extra_kwargs = {'registered_courses': {'read_only': True},}
    