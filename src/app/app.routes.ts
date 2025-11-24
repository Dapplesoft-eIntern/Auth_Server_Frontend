import { Route, Routes } from '@angular/router'
import { loginRoutes, LoginRoutes } from './pages/auth/login/login.routes'
import { SignupRoutes, signupRoutes } from './pages/auth/signup/signup.routes'
import { userprofileRoutes, UserProfileRoutes } from './pages/auth/profile/user-profile.routes'
import { resetRoutes, ResetRoutes } from './pages/auth/reset/reset.routes'
import { VerifiedRoutes } from './pages/auth/verifed/verified.routes'
import { VerifiedotpRoutes } from './pages/auth/verifedotp/verified.routes'
// import { adminLoginRoutes, AdminLoginRoutes } from './pages/dashboard-auth/admin-login/admin-login.routes'
// import { adminSignupRoutes, AdminSignupRoutes } from './pages/dashboard-auth/admin-signup.routes'
// import { adminForgetRoutes, AdminForgetRoutes } from './pages/dashboard-auth/admin-forget.routes'

import { userRoutes, UserRoutes } from './pages/dashboard/user/user.routes'
import { profileRoutes, ProfileRoutes } from './pages/dashboard/ueser-profile/profile.routes'
import { userhistoryRoutes, UserHistoryRoutes } from './pages/dashboard/user-history/user-history.routes'
import { businessesRoutes, BusinessesRoutes } from './pages/dashboard/business/businesses.routes'
import { memberRoutes, MemberRoutes } from './pages/dashboard/business-member/member.routes'
import { rolesRoutes, RolesRoutes } from './pages/dashboard/roles/roles.routes'
import { PermissionsRoutes } from './pages/dashboard/permission/permissions.routes'
import { RolePermissionsRoutes } from './pages/dashboard/rolepermissions/rolepermissions.routes'
import { applicationsRoutes, ApplicationsRoutes } from './pages/dashboard/applications/applications.routes'
import { tokensRoutes, TokensRoutes } from './pages/dashboard/tokens/tokens.routes'
import { EmailVerificationsRoutes, emailVerificationssRoutes } from './pages/dashboard/emailverifications/emailVerifications.routes'
import { PasswordResetsRoutes, passwordresetsRoutes } from './pages/dashboard/passwordresets/passwordresets.routes'
import { mfasettingsRoutes, MfaSettingsRoutes } from './pages/dashboard/mfasettings/mfasettings.routes'
import { mfalogsRoutes, MfaLogsRoutes } from './pages/dashboard/mfalogs/mfalogs.routes'
import { auditlogsRoutes, AuditLogsRoutes } from './pages/dashboard/auditlogs/auditlogs.routes'

import { NotFoundRoutes, notFoundRoutes } from './pages/not-found/not-found.routes'




type AppRouteGroups = [
    LoginRoutes,
    signupRoutes,
    UserProfileRoutes,
    ResetRoutes,
    VerifiedRoutes,
    VerifiedotpRoutes,

    // AdminLoginRoutes,
    // AdminSignupRoutes,
    // AdminForgetRoutes,
    UserRoutes,
    ProfileRoutes,
    UserHistoryRoutes,
    BusinessesRoutes,
    MemberRoutes,
    RolesRoutes,
    PermissionsRoutes,
    RolePermissionsRoutes,
    ApplicationsRoutes,
    TokensRoutes,
    EmailVerificationsRoutes,
    PasswordResetsRoutes,
    MfaSettingsRoutes,
    MfaLogsRoutes,
    AuditLogsRoutes,
    NotFoundRoutes,
]

const groupedRoutes: AppRouteGroups = [
    loginRoutes,
    SignupRoutes,
    userprofileRoutes,
    resetRoutes,
    VerifiedRoutes,
    VerifiedotpRoutes,
    // adminLoginRoutes,
    // adminSignupRoutes,
    // adminForgetRoutes,
    userRoutes,
    profileRoutes,
    userhistoryRoutes,
    businessesRoutes,
    memberRoutes,
    rolesRoutes,
    PermissionsRoutes,
    RolePermissionsRoutes,
    applicationsRoutes,
    tokensRoutes,
    emailVerificationssRoutes,
    passwordresetsRoutes,
    mfasettingsRoutes,
    mfalogsRoutes,
    auditlogsRoutes,
    notFoundRoutes,
]

const flattenedRoutes: Route[] = []
for (const routeGroup of groupedRoutes) {
    for (const route of Object.values(routeGroup)) {
        flattenedRoutes.push(route)
    }
}

export const appRoutes = flattenedRoutes


