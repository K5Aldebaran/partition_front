import { Card, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import type { Partition } from '../../services/partitionsApi'
import { useAppDispatch, useAppSelector } from '../../../store'
import { addPartitionToDraft, fetchCart } from '../../../store/requestsSlice'
import { isGuestMode } from '../../../config/appConfig'

const PLACEHOLDER = '/placeholder-partition.svg'

export function PartitionCard({ s }: { s: Partition }) {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector(st => st.requests)
  const user = useAppSelector(st => st.auth.user)
  const nav = useNavigate()
  const guest = isGuestMode()
  const img = s.image_url || s.public_image_url || PLACEHOLDER
  return (
    <Card className="h-100">
      {/* Адаптивное изображение карточки: фиксируем пропорции 16:9 */}
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <Card.Img
          src={img}
          alt={s.title}
          style={{ objectFit: 'cover', height: '100%' }}
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement
            if (el.src !== window.location.origin + PLACEHOLDER) {
              el.src = PLACEHOLDER
            }
          }}
        />
      </div>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-start">
          <span>{s.title.split(' ')[0]}</span>
          {!s.is_active && <span className="badge text-bg-secondary">скрыт</span>}
        </Card.Title>
        {s.thickness && <div className="text-muted small mb-2">Ширина: {s.thickness}</div>}
        <Link className="btn btn-primary" to={`/partitions/${s.id}`}>Подробнее</Link>
        {!guest && (
          <Button
            variant="outline-success"
            className="ms-2"
            disabled={loading}
            onClick={async () => {
              const hasToken = !!user || !!localStorage.getItem('app:token')
              if (!hasToken) { nav('/login'); return }
              const res = await dispatch(addPartitionToDraft(s.id)) as any
              // если сервер вернул 401, отправим на логин
              if (res?.error?.message?.includes('401')) { nav('/login'); return }
              dispatch(fetchCart())
            }}
          >Добавить</Button>
        )}
      </Card.Body>
    </Card>
  )
}
