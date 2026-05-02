import React from 'react';
import { Bell, Shield, Palette, User, ChevronRight } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Switch } from '../../../components/ui/Toggle';
import { useAuthStore } from '../../../stores/authStore';
import { Avatar } from '../../../components/ui/Avatar';

export const SettingsPage: React.FC = () => {
  const { user } = useAuthStore();
  const [notifs, setNotifs] = React.useState(true);
  const [criticalAlerts, setCriticalAlerts] = React.useState(true);
  const [emailDigest, setEmailDigest] = React.useState(false);

  return (
    <div className="max-w-2xl space-y-5 page-enter">
      {/* Profile card */}
      <Card padding="md">
        <div className="flex items-center gap-4">
          <Avatar name={user?.displayName || user?.email || 'Admin'} size="xl" />
          <div>
            <p className="font-display text-base font-bold text-surface-900">{user?.displayName || 'Admin User'}</p>
            <p className="text-sm text-surface-500">{user?.email || 'admin@medcare.com'}</p>
            <span className="inline-block mt-1.5 text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full font-medium">Administrator</span>
          </div>
        </div>
      </Card>

      {/* Notification settings */}
      <Card padding="none">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-surface-100">
          <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center"><Bell size={13} className="text-primary-600" /></div>
          <p className="font-display text-sm font-bold text-surface-900">Notifications</p>
        </div>
        <div className="divide-y divide-surface-100">
          {[
            { label: 'Push Notifications', desc: 'Receive alerts in your browser', value: notifs, onChange: setNotifs },
            { label: 'Critical Patient Alerts', desc: 'Immediate alerts for critical status changes', value: criticalAlerts, onChange: setCriticalAlerts },
            { label: 'Daily Email Digest', desc: 'Summary of the day sent to your email', value: emailDigest, onChange: setEmailDigest },
          ].map(s => (
            <div key={s.label} className="flex items-center justify-between px-5 py-3.5 gap-4">
              <div>
                <p className="text-sm font-medium text-surface-800">{s.label}</p>
                <p className="text-xs text-surface-400">{s.desc}</p>
              </div>
              <Switch checked={s.value} onChange={s.onChange} />
            </div>
          ))}
        </div>
      </Card>

      {/* Other settings */}
      <Card padding="none">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-surface-100">
          <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center"><Shield size={13} className="text-surface-600" /></div>
          <p className="font-display text-sm font-bold text-surface-900">Account & Security</p>
        </div>
        {['Change Password', 'Two-Factor Authentication', 'Login History', 'Privacy Settings'].map(item => (
          <div key={item} className="flex items-center justify-between px-5 py-3.5 border-b last:border-0 border-surface-100 hover:bg-surface-50 cursor-pointer transition-colors group">
            <p className="text-sm font-medium text-surface-700">{item}</p>
            <ChevronRight size={14} className="text-surface-300 group-hover:text-surface-500 transition-colors" />
          </div>
        ))}
      </Card>

      <Card padding="none">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-surface-100">
          <div className="w-7 h-7 rounded-lg bg-surface-100 flex items-center justify-center"><Palette size={13} className="text-surface-600" /></div>
          <p className="font-display text-sm font-bold text-surface-900">Appearance</p>
        </div>
        <div className="p-5">
          <p className="text-xs text-surface-400 mb-3">Theme</p>
          <div className="flex gap-2">
            {['System', 'Light', 'Dark'].map(t => (
              <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${t === 'Light' ? 'bg-primary-50 border-primary-300 text-primary-700' : 'border-surface-200 text-surface-600 hover:border-surface-300'}`}>{t}</button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
