from django_python3_ldap.utils import format_search_filters

def custom_format_search_filters(ldap_fields):
    # Call the base format callable.
    search_filters = format_search_filters(ldap_fields)

    # Uncomment the next line to only allow people in indecol
    # (helpful when syncing users)
    search_filters.append("(|(uid=candyd)(uid=trondkvi)(uid=thomaaad)(uid=arvesk)(uid=gurohoel)(uid=jamesrda)(uid=anitay)(uid=nicholw)(uid=burheim)(uid=francher)(uid=francesv)(uid=djuric)(uid=anitay)(uid=terlovas)(uid=oled)(uid=ninala))")

    return search_filters
