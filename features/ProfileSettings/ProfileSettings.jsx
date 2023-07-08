import { ProfileSettingsProfileForm } from './ProfileSettingsProfileForm';
import { ProfileSettingsPersonalInformationForm } from './ProfileSettingsPersonalInformationForm';
import { ProfileSettingsNotificationsForm } from './ProfileSettingsNotificationsForm';

const ProfileSettings = () => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
        <ProfileSettingsProfileForm />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <ProfileSettingsPersonalInformationForm />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <ProfileSettingsNotificationsForm />
      </div>
    </div>
  )
}

export default ProfileSettings;