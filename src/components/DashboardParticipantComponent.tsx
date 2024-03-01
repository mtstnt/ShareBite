import { Card } from "flowbite-react";
import { Participant } from "../types/dashboard"

type Props = {
    participants: Participant[];
}

export default function DashboardParticipantComponent({ participants }: Props) {
    return <>
        <div className="space-y-3">
            { participants.map(e => (
                <Card key={e.name}>
                    <h2>{ e.name }</h2>
                    <ul className="list-disc ms-5">
                        { e.order.map(f => (
                            <li key={f.itemId}>{ f.itemId } { f.quantity }</li>
                        )) }
                    </ul>
                </Card>
            )) }
        </div>
    </>
}