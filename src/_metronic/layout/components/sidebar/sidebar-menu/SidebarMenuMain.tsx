/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      <SidebarMenuItem
        to='/products'
        icon='element-2'
        title="Products"
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/brands'
        icon='element-11'
        title="Brands"
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/category'
        icon='element-4'
        title="Category"
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
        to='/relation'
        icon='element-5'
        title="Relation"
        fontIcon='bi-app-indicator'
      />
    </>
  )
}

export {SidebarMenuMain}
