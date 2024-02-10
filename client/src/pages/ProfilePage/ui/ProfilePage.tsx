import { useRef } from 'react'

import { useGetProfileData, useSendAvatar } from '@/entities/User/model/api/profileApi'
import Avatar from '@/shared/assets/icons/Avatar.svg?react'
import Edit from '@/shared/assets/icons/Edit.svg?react'
import Trash from '@/shared/assets/icons/Trash.svg?react'
import { Input } from '@/shared/ui/Input'
import { RoundButton, RoundButtonSize, RoundButtonTheme } from '@/shared/ui/RoundButton'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const { data: profile, refetch } = useGetProfileData()
  const [sendAvatar] = useSendAvatar()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleClickOnFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const handleUploadIng = async () => {
    try {
      if (inputFileRef.current) {
        const file = inputFileRef.current.files?.[0]

        if (file) {
          const reader = new FileReader()
          reader.readAsDataURL(file)

          reader.onload = async () => {
            const base64Data = typeof reader.result === 'string' ? reader.result.split(',')[1] : null

            if (base64Data) {
              const data = {
                id: profile?.id,
                firstName: profile?.firstName,
                middleName: profile?.middleName,
                lastName: profile?.lastName,
                avatarFileData: base64Data,
                avatarFileName: file.name,
              }

              await sendAvatar(JSON.stringify(data))
              refetch()
            } else {
              throw new Error('Ошибка при чтении данных файла')
            }
          }
        } else {
          throw new Error('Файл не выбран')
        }
      } else {
        throw new Error('Ошибка при отправке изображения')
      }
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  const handleChangeFileInput = async () => {
    handleUploadIng()
  }

  return (
    <div className={cls.profile}>
      <pre className={cls.tabs}>{JSON.stringify(profile, null, '   ')}</pre>
      <div className={cls.sidebar}>
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className={cls['file-input']}
          onChange={handleChangeFileInput}
        />

        <div className={cls.avatar}>
          <RoundButton
            className={cls.avatar__edit}
            size={RoundButtonSize.M}
            theme={RoundButtonTheme.SECONDARY}
            onClick={handleClickOnFileInput}
          >
            <Edit />
          </RoundButton>
          <RoundButton className={cls.avatar__trash} size={RoundButtonSize.M} theme={RoundButtonTheme.SECONDARY}>
            <Trash />
          </RoundButton>

          {profile?.avatar.includes('http') ? (
            <img src={profile?.avatar} alt="User Avatar" />
          ) : (
            <div className={cls.avatar__fake}>
              <Avatar />
            </div>
          )}
        </div>

        <Input inputName="Имя" placeholder={profile?.firstName} disabled onChange={() => {}} />
        <Input inputName="Фамилия" placeholder={profile?.middleName} disabled onChange={() => {}} />
        <Input inputName="Отчество" placeholder={profile?.lastName} disabled onChange={() => {}} />
        <Input inputName="Email" placeholder={profile?.email} disabled onChange={() => {}} />
      </div>
    </div>
  )
}
