import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { prisma } from "@/lib/prisma"

export default async function AdminMessagesPage() {
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin">
                        <Button variant="outline" size="sm">
                            ← Dashboard
                        </Button>
                    </Link>
                    <h1 className="text-lg font-semibold md:text-2xl">Messages</h1>
                </div>
            </div>
            <div className="border rounded-lg shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="hidden md:table-cell">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-4">No messages found.</TableCell>
                            </TableRow>
                        ) : messages.map((msg: { id: string; email: string; message: string; createdAt: Date }) => (
                            <TableRow key={msg.id}>
                                <TableCell className="font-medium">{msg.email}</TableCell>
                                <TableCell className="max-w-md truncate" title={msg.message}>{msg.message}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {new Date(msg.createdAt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
