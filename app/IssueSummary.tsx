import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props{
    open:number;
    inProgress:number;
    closed:number
}

const IssueSummary = ({open,closed,inProgress}:Props) => {
    const container:{
        label:string;value:number;status:Status
    }[]=[
        {label:"Open Issues",value:open,status:"OPEN"},
        {label:"In-progress Issues",value:inProgress,status:"IN_PROGRESS"},
        {label:"Closed Issues",value:closed,status:"CLOSED"},
    ]
  return (
    <Flex gap="4">
        {
            container.map(st=>(
                <Card key={st.label}>
                    <Flex direction="column" gap="1">
                        <Link className="text-sm font-medium" href={`/issues?status=${st.status}`}>
                            {st.label}
                        </Link>
                        <Text size="5" className="font-bold">{st.value}</Text>
                    </Flex>

                </Card>
            ))
        }

    </Flex>
  )
}

export default IssueSummary