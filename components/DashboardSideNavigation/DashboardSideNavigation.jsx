/* Config */
import { appConfig } from '../../config/appConfig'

/* Styles & Micro Components */
import {
  StyledDashboardLayoutNav,
  StyledDashboardLayoutList,
  StyledDashboardLayoutItem
} from './DashboardSideNavigation.styled';

const DashboardSideNavigation = ({ navigation = appConfig.navigation }) => {
  return (
    <StyledDashboardLayoutNav>
      <StyledDashboardLayoutList>
        {navigation.map((item) => (
          <StyledDashboardLayoutItem key={item.name} item={item} />
        ))}
      </StyledDashboardLayoutList>
    </StyledDashboardLayoutNav>
  )
}

export default DashboardSideNavigation;