const config = useAppConfig()

const BASE_FILES_URL = `${config.baseURL}/core/filestorage/`

export default function useFileStorage() {
  const getPicturePath = (picture?: string) => {
    if (!picture) return `/img/New_Store_Huntress.webp`
    return BASE_FILES_URL + encodeURIComponent(picture.replace(/^[\w]+:/, ''))
  }

  return {
    getPicturePath,
  }
}
