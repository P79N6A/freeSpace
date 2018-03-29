from django import template
register=template.Library()


@register.filter()
def cutback(data,arg=10):
    length=int(arg)
    new_data=data[arg+1]
    return new_data+"..."