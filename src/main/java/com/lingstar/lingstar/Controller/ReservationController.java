package com.lingstar.lingstar.Controller;

import java.util.List;

import com.lingstar.lingstar.Model.Reservation;
import com.lingstar.lingstar.Service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservation")

public class ReservationController {
    
    @Autowired
    private ReservationService reservService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public List<Reservation> ListReservation() {
        return reservService.findAll();
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation saveReservation(@RequestBody Reservation reservation) {
        return reservService.saveReservation(reservation);
    }

    // @PostMapping("/save")
    // public String registerUser(@ModelAttribute User user, Model model, BindingResult result) {
    //     if(result.hasErrors()) {
    //         return "redirect:/auth/register";
    //     } else {
    //         model.addAttribute("usuario", userService.register(user));
    //     }
    //     return "redirect:/auth/login";
    // }

    // @GetMapping("/{reservationId}")
    // @ResponseStatus(HttpStatus.OK)
    // public Reservation getReservationId(@PathVariable("reservationId") Integer reservationId) {
    //     return reservService.getReservationId(reservationId);
    // }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Reservation update(@RequestBody Reservation reservation){
        return reservService.updateReservation(reservation);
    }

    @DeleteMapping("/delete/{reservationId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("reservationId") Integer reservationId) {
        reservService.deleteReservation(reservationId);
    }
}
