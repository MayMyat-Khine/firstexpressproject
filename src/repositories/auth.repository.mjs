import { RefreshToken } from "../mongoose/schemas/refresh_token.mjs";

export async function saveRefreshTokenRepo({ id, type, token, expiresAt }) {
    // hash
    const hashToken = token;
    const newToken = await RefreshToken.findOneAndUpdate(
        {
            account_id: id,
            account_type: type
        },
        {
            token_hash: hashToken,
            expiresAt
        },
        {
            upsert: true,
            new: true
        }
    );
    // const newToken = new RefreshToken({ account_id: id, account_type: type, token_hash: hashToken, expiresAt: expiresAt });
    // const savedToken = await newToken.save();
    return newToken;
}

export async function getRefreshToken(token) {
    return await RefreshToken.findOne({

        token_hash: token
    });
}