function getCookieAsJson(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    try {
      const cookieValue = decodeURIComponent(parts.pop()!.split(";").shift()!);
      return JSON.parse(cookieValue);
    } catch (error) {
      console.error("err:", error);
      return false;
    }
  }

  return false;
}

export default getCookieAsJson;
