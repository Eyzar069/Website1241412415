import { notFound } from "next/navigation"
import { getDeviceById } from "../actions"
import DeviceDetailClient from "./device-detail-client"

export default async function DeviceDetailPage({ params }: { params: { deviceId: string } }) {
  const device = await getDeviceById(params.deviceId)

  if (!device) {
    notFound()
  }

  return <DeviceDetailClient device={device} />
}
