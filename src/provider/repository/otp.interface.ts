export interface Otp {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    code: number
    is_active?: boolean
    expiration: Date | string
    user_id: string
}