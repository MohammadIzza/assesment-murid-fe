# Admin Management Notice

This directory previously contained views for Admin user management, but this functionality has been removed.

Admin users will still exist in the system, and the `isAdmin` role is still used to:
1. Control access to certain features
2. Show/hide certain menu items based on user role

However, direct management of admin users is no longer supported through the UI.

The admin role is now only used for data management of other entities (guru, siswa, kelas, etc.), not for managing admin users themselves.