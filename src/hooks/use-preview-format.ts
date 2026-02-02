"use client"

import { useState, useEffect } from 'react'
import { STORAGE_KEYS } from '@/constants/storage-keys'

type PreviewFormat = 'text' | 'tree'

export function usePreviewFormat() {
    const [format, setFormat] = useState<PreviewFormat>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEYS.PREVIEW_FORMAT)
            return (saved as PreviewFormat) || 'tree'
        }
        return 'tree'
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEYS.PREVIEW_FORMAT, format)
    }, [format])

    return { format, setFormat }
}
