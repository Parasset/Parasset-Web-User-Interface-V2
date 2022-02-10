import { useCallback, useEffect, useState } from 'react'


const useEncryptAddress = (address: string) => {
  const [newAddress, setNewAddress] = useState('')
  const encryptAddress = useCallback(async () => {
    setNewAddress(address.replace(/(\w{4})\w*(\w{4})/, '$1******$2'))
  }, [address])

  useEffect(() => {
    if (address) {
      encryptAddress()
    }
  }, [address])

  return newAddress
}

export default useEncryptAddress
