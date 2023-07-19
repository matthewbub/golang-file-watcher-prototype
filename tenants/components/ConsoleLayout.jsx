import { SideNavigation } from './SideNavigation';

export const ConsoleLayout = ({ children }) => {
  return (
    <div className='grid grid-cols-12 gap-5 h-full'>
      <div className='col-span-3 h-full'>
        <SideNavigation />
      </div>
      <div className='col-span-9'>
        {children}
      </div>
    </div>
  )
}