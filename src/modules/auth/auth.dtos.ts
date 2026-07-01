export interface LoginDTO {
    username: string,
    password: string,
}

export interface LoginResponseDTO {
    token: string;
    username: string;
}

export interface RegisterDTO {
    username: string,
    password: string,
    confirmPassword: string
}