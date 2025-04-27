import { apiClient } from "@/api/apiClient";

// 채팅방 목록 가져오기
export async function fetchChatRooms() {
  try {
    const response = await apiClient.get<{ data: any[] }>("/api/chat/rooms");
    return response.data.data; // data 배열만 반환
  } catch (error) {
    console.error("채팅방 목록 불러오기 실패", error);
    throw error;
  }
}
