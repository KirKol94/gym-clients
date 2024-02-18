import type { ChangeEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { useGetProfileData, userActions, useSendAvatar, useUpdateProfileData } from '@/entities/User'
import Avatar from '@/shared/assets/icons/avatar.svg?react'
import Edit from '@/shared/assets/icons/edit.svg?react'
import Trash from '@/shared/assets/icons/trash.svg?react'
import { useAppDispatch } from '@/shared/hooks'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { RoundButton, RoundButtonSize, RoundButtonTheme } from '@/shared/ui/RoundButton'

import cls from './ProfilePage.module.scss'

export const ProfilePage = () => {
  const dispatch = useAppDispatch()
  const { data: profile, isSuccess: isProfileSuccess, refetch } = useGetProfileData()
  const [sendAvatar] = useSendAvatar()
  const [updateProfileData] = useUpdateProfileData()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [isEdit, setIsEdit] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleSubmit = async () => {
    setIsEdit(false)

    try {
      if (profile) {
        const updatedData = { id: profile.id, ...profileData }
        await updateProfileData(updatedData)
        refetch()
      } else {
        throw new Error('Отсутствуют данные профиля')
      }
    } catch (e) {
      console.log((e as Error).message)
    }
  }

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

  useEffect(() => {
    if (isProfileSuccess) {
      setProfileData({
        firstName: profile.firstName,
        middleName: profile.middleName,
        lastName: profile.lastName,
        email: profile.email,
      })
    }
  }, [isProfileSuccess, profile])

  useEffect(() => {
    if (profile) {
      dispatch(userActions.setProfileData(profile))
    }
  }, [dispatch, profile])

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

          {profile?.avatar ? (
            <img src={profile?.avatar} alt="User Avatar" />
          ) : (
            <div className={cls.avatar__fake}>
              <Avatar />
            </div>
          )}
        </div>

        <Input
          inputName="Имя"
          name="firstName"
          placeholder={profile?.firstName}
          value={isEdit ? profileData.firstName : ''}
          onChange={handleChange}
          disabled={!isEdit}
        />
        <Input
          inputName="Фамилия"
          name="middleName"
          placeholder={profile?.middleName}
          value={isEdit ? profileData.middleName : ''}
          onChange={handleChange}
          disabled={!isEdit}
        />
        <Input
          inputName="Отчество"
          name="lastName"
          placeholder={profile?.lastName}
          value={isEdit ? profileData.lastName : ''}
          onChange={handleChange}
          disabled={!isEdit}
        />
        <Input
          inputName="Email"
          name="email"
          placeholder={profile?.email}
          value={isEdit ? profileData.email : ''}
          onChange={handleChange}
          disabled={!isEdit}
        />
        <Button size={ButtonSize.M} className={cls.button} onClick={isEdit ? handleSubmit : handleEdit}>
          {isEdit ? 'Сохранить' : 'Редактировать'}
        </Button>
      </div>
    </div>
  )
}
