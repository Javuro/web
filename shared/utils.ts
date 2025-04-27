/**
 * 텍스트를 URL 친화적인 슬러그로 변환
 * 한글, 영문, 숫자를 지원하며 공백은 대시(-)로 변환됩니다.
 */
export function slugify(text: string): string {
  // 지원하지 않는 문자 제거 및 공백을 하이픈으로 변환
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    // 공백 및 특수문자를 하이픈으로 변환
    .replace(/[\s./_:;#?!@$%^&*()=+\\|~`'"{},<>[\]]+/g, '-')
    // 연속된 하이픈 하나로 변환
    .replace(/-+/g, '-')
    // 양 끝의 하이픈 제거
    .replace(/^-+|-+$/g, '');
  
  return slug;
}

/**
 * 날짜를 포맷팅하는 함수
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 간단한 텍스트 축약 함수
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}