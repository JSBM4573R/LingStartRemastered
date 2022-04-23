package com.lingstar.lingstar.Repository.Crud;

import java.util.Optional;

import com.lingstar.lingstar.Model.Reservation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationCrudRepository extends JpaRepository<Reservation, Integer> {
    Optional<Reservation> findById(Integer reservationId);
}
