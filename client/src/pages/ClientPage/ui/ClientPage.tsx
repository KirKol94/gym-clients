import { useParams } from 'react-router-dom'

import { useGetClientData } from '@/entities/Client'
import { Title, TitleSize } from '@/shared/ui/Title'

import cls from './ClientPage.module.scss'
import { Loader, LoaderSize } from '@/shared/ui/Loader'

export const ClientPage = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetClientData(id)

  if (isLoading) return <Loader size={LoaderSize.BIG} />

  return (
    <div className={cls.clientPage}>
      <Title level={1} size={TitleSize.XXL}>{`${data?.firstName} ${data?.middleName}`}</Title>

      <pre>{JSON.stringify(data, null, '   ')}</pre>
    </div>
  )
}
