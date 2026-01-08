import { useTranslation } from 'react-i18next'

function Home() {
  const { t, i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 gap-4">
      <h1 className="text-3xl font-bold text-purple-500">{t('helloWorld')}</h1>
      <div className="flex gap-2">
        <button
          onClick={() => changeLanguage('pt')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          PT
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          EN
        </button>
        <button
          onClick={() => changeLanguage('es')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          ES
        </button>
      </div>
    </div>
  )
}

export default Home
