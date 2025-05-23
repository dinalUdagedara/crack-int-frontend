import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/api.types";
import { LoginResponse, LoginTokens, User } from "@/types/auth.types";

export const register = async (
  first_name: string,
  last_name: string,
  email: string,
  password: string
): Promise<ApiResponse<User | null>> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`;
    const payload = {
      first_name,
      last_name,
      email,
      password
    };
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json"
    };
    const response = await axios.post(endpoint, payload, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorPayload = axiosError.response?.data || "Something went wrong";
    console.debug("DEBUG: error while register with API ", errorPayload);
    return errorPayload as ApiResponse<null>;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<ApiResponse<LoginTokens | null>> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`;
    const payload = {
      email,
      password
    };
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json"
    };
    const response = await axios.post(endpoint, payload, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorPayload = axiosError.response?.data || "Something went wrong";
    console.debug("DEBUG: error while authenticate with API ", errorPayload);
    return {
      message:
        typeof errorPayload === "string" ? errorPayload : "An error occurred",
      success: false,
      payload: null
    };
  }
};

export const getMe = async (
  access_token: string
): Promise<ApiResponse<LoginResponse | null>> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/me`;
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`
    };
    const response = await axios.get(endpoint, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorPayload = axiosError.response?.data || "Something went wrong";
    console.debug("DEBUG: error while authenticate with API ", errorPayload);
    return {
      message:
        typeof errorPayload === "string" ? errorPayload : "An error occurred",
      success: false,
      payload: null
    };
  }
};

export const verifyEmail = async (
  otp: string,
  user_id: string
): Promise<ApiResponse<User | null>> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email`;
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json"
    };

    const payload = {
      user_id: user_id,
      otp: otp
    };

    const response = await axios.post(endpoint, payload, { headers });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorPayload = axiosError.response?.data || "Something went wrong";
    console.debug("DEBUG: error while verify email with API ", errorPayload);
    return errorPayload as ApiResponse<null>;
  }
};

export const resendVerificationEmail = async (
  user_id: string
): Promise<ApiResponse<User | null>> => {
  try {
    const endpoint = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend-verification-email`;
    const payload = {
      user_id: user_id
    };
    const response = await axios.post(endpoint, payload);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorPayload = axiosError.response?.data || "Something went wrong";
    return errorPayload as ApiResponse<null>;
  }
};
