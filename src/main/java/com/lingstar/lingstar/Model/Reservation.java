package com.lingstar.lingstar.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name = "reservation")
public class Reservation implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "reservation_room", nullable = false, length = 45)
    private String room;
    @Column(name = "reservation_dateGetInto", nullable = false, length = 45)
    private String dateGetInto;
    @Column(name = "reservation_dateGetOut", nullable = false, length = 45)
    private String dateGetOut;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"reservations", "user"})
    private User user;
}
