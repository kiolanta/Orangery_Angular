# API Integration Guide

## Структура API

### Base URL
```
http://localhost:7232/api
```

## Реалізовані сервіси

### 1. EmployeeService
Розташування: `src/app/core/services/employee.service.ts`

**Методи:**
- `getEmployees()` - отримати список всіх працівників
- `getEmployee(id)` - отримати працівника за ID
- `createEmployee(employee)` - створити нового працівника
- `updateEmployee(id, employee)` - оновити працівника
- `deleteEmployee(id)` - видалити працівника

**Інтерфейси:**
- `Employee` - базовий інтерфейс працівника
- `EmployeeViewModel` - view model для відображення
- `EmployeeCreateViewModel` - model для створення

### 2. Plants Service
Розташування: `src/app/features/plants/services/plants.ts`

**Методи:**
- `getPlants()` - отримати список всіх рослин
- `getPlant(id)` - отримати рослину за ID
- `createPlant(plant)` - створити нову рослину
- `updatePlant(id, plant)` - оновити рослину
- `deletePlant(id)` - видалити рослину

**Інтерфейси:**
- `Plant` - базовий інтерфейс рослини
- `PlantViewModel` - view model для відображення
- `PlantCreateViewModel` - model для створення

### 3. Dashboard Service
Розташування: `src/app/features/dashboard/services/dashboard.ts`

**Методи:**
- `getDashboardData()` - отримати агреговані дані для дашборду

**Інтерфейси:**
- `DashboardData` - дані дашборду
- `ActivityItem` - елемент активності

## Компоненти

### Dashboard Page
Розташування: `src/app/features/dashboard/components/dashboard-page/`

Відображає:
- Загальну кількість рослин
- Загальну кількість працівників
- Кількість активних сенсорів

### Plants List
Розташування: `src/app/features/plants/components/plants-list/`

Функціонал:
- Перегляд списку рослин
- Видалення рослин
- Кнопки для редагування (потребує реалізації форми)

## Наступні кроки

1. **Створити форми для додавання/редагування рослин:**
   - Компонент `plant-form`
   - Реактивні форми з валідацією

2. **Додати сторінку для працівників:**
   - Список працівників
   - Форми для CRUD операцій

3. **Додати обробку помилок:**
   - Error interceptor
   - Toast notifications

4. **Додати завантажувачі та skeleton screens**

5. **Додати пагінацію для великих списків**

6. **Додати фільтрацію та пошук**

## Використання

### Приклад використання Plants Service:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { Plants } from './services/plants';

@Component({...})
export class MyComponent implements OnInit {
  private plantsService = inject(Plants);
  
  ngOnInit() {
    this.plantsService.getPlants().subscribe(plants => {
      console.log(plants);
    });
  }
}
```

### Приклад створення нової рослини:

```typescript
const newPlant: PlantCreateViewModel = {
  name: 'Троянда',
  species: 'Rosa',
  datePlanted: new Date(),
  location: 'Оранжерея №1'
};

this.plantsService.createPlant(newPlant).subscribe(
  result => console.log('Створено:', result),
  error => console.error('Помилка:', error)
);
```

## API Endpoints

### Employees
- `GET /api/employees` - список всіх працівників
- `GET /api/employees/{id}` - працівник за ID
- `POST /api/employees` - створити працівника
- `PUT /api/employees/{id}` - оновити працівника
- `DELETE /api/employees/{id}` - видалити працівника

### Plants
- `GET /api/plants` - список всіх рослин
- `GET /api/plants/{id}` - рослина за ID
- `POST /api/plants` - створити рослину
- `PUT /api/plants/{id}` - оновити рослину
- `DELETE /api/plants/{id}` - видалити рослину
