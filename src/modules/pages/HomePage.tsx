import { Card, Col, Row } from 'react-bootstrap'
import { getApiBase, isGuestMode } from '../../config/appConfig'

export function HomePage() {
  const apiBase = getApiBase()
  const guest = isGuestMode()
  return (
    <Row>
      <Col md={8}>
        <h1 className="display-6">Partition Soundproofing</h1>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Навигация</Card.Title>
            <ul>
              <li>Перегородки — список карточек с фильтрами</li>
              {!guest && <li>Авторизация — вход/регистрация пользователя</li>}
              {!guest && <li>Заявки — список и статус заявок пользователя</li>}
              {!guest && <li>Черновик — добавление перегородок и формирование заявки</li>}
            </ul>
            <hr />
            <div className="small text-muted">
              API base: <span className="fw-semibold">{apiBase || '(proxy / пусто)'}</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
