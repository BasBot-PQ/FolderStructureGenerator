import React, { useState, useEffect } from 'react'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Github } from "lucide-react"
import Link from 'next/link'

const ProfileCard: React.FC = () => {
    const [joinDate, setJoinDate] = useState<string | null>(null)
    const username = 'TiwKill'

    useEffect(() => {
        const fetchGithubProfile = async () => {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`)
                const data = await response.json()
                if (data.created_at) {
                    const date = new Date(data.created_at)
                    const formattedDate = date.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                    })
                    setJoinDate(formattedDate)
                }
            } catch (error) {
                console.error('Error fetching GitHub profile:', error)
            }
        }

        fetchGithubProfile()
    }, [username])

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    Folder structure
                </button>
            </HoverCardTrigger>
        </HoverCard>
    )
}

export default ProfileCard 