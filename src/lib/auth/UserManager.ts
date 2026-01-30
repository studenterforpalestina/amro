import { UserManager, type UserManagerSettings } from 'oidc-client-ts';

const settings: UserManagerSettings = {
    authority: "http://localhost/application/o/sfp-admin/", // SHOULD BE HTTPS IN production
    client_id: "H05hj25LtVS2HevWxT0Imfk0nABd7phiWSHBvnNo", // can be saved in plain text
    redirect_uri: "http://localhost:3000/callback", 
    response_type: "code",
    scope: "openid profile email",
    post_logout_redirect_uri: "http://localhost:3000/",
};

export const userManager = new UserManager(settings);

export async function login() {
    return userManager.signinRedirect();
}

export async function logout() {
    return userManager.signoutRedirect();
}

export async function getUser() {
    return userManager.getUser();
}
