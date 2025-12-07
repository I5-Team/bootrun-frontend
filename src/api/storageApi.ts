// 이미지 업로드 처리
const BASE_URL = 'https://bootrun-backend.duckdns.org';

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('로그인 후 이용해주세요.');
    }
    const response = await fetch(
      `${BASE_URL}/storage/upload/image
`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }
    const result = await response.json();
    if (!result.success) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }
    return result.data.file_url;
  } catch (error) {
    console.error('이미지 업로드에 실패했습니다. :', error);
    throw error;
  }
};

export const validateImage = (file: File): boolean => {
  const max_size = 10 * 1024 * 1024; // 10MB
  if (file.size > max_size) {
    alert('이미지 파일 크기는 10MB를 초과할 수 없습니다.');
    return false;
  }
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    alert('이미지 파일 형식은 JPEG, PNG, GIF, WEBP만 업로드 가능합니다.');
    return false;
  }
  return true;
};
