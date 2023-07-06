/* Config */
import { appConfig } from '../../config/appConfig'

/* Styles & Micro Components */
import {
  StyledDashboardSideNavigationNav,
  StyledDashboardSideNavigationList,
  StyledDashboardSideNavigationItem
} from './DashboardSideNavigation.styled';

const DashboardSideNavigation = ({ navigation = appConfig.navigation, current }) => {
  const navigationWithCurrent = navigation.map((item) => {
    if (item.href === current) {
      return {
        ...item,
        current: true
      }
    }
    return item
  })

  return (
    <StyledDashboardSideNavigationNav>
      <StyledDashboardSideNavigationList>
        {navigationWithCurrent.map((item) => (
          <StyledDashboardSideNavigationItem key={item.name} item={item} />
        ))}
      </StyledDashboardSideNavigationList>
    </StyledDashboardSideNavigationNav>
  )
}

export default DashboardSideNavigation;